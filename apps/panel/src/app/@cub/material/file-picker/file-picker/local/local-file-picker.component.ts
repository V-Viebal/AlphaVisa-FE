import {
	ChangeDetectionStrategy,
	Component,
	forwardRef,
	Inject,
	InjectionToken,
	Input,
	Optional,
	ViewEncapsulation
} from '@angular/core';
import {
	Observable
} from 'rxjs';
import _ from 'lodash';

import {
	Unsubscriber,
	untilCmpDestroyed,
	UploadData
} from 'angular-core';

import {
	CUBFile,
	CUBFileSource
} from '../../file/file.component';

import {
	CUBFilePickerInside
} from '../file-picker.inside';

export type CUBUploadFileResponse = {
	type: 1 | 2 | 3 | 4;
	loaded?: number;
	total?: number;
	body?: CUBFile[];
};

export type CUBUploadFileRequest = {
	authorizedKey?: string;
	options?: ObjectType;
	requestUrl?: string;
}

export interface CUBIFileService {
	upload: (
		data: UploadData,
		authorizedKey?: string,
		options?: ObjectType,
		requestUrl?: string,
	) => Observable<CUBUploadFileResponse>;
}

export type CUBFileService = CUBIFileService;

export const CUB_FILE_SERVICE: InjectionToken<CUBFileService>
	= new InjectionToken<CUBFileService>( 'CUB_FILE_SERVICE' );
export const CUB_LOCAL_FILE_SIZE_LIMIT: InjectionToken<number>
	= new InjectionToken<number>( 'CUB_LOCAL_FILE_SIZE_LIMIT' );

export type CUBFileExtra = CUBFile & {
	get invalid(): boolean;
};

@Unsubscriber()
@Component({
	selector: 'cub-local-file-picker',
	templateUrl: './local-file-picker.pug',
	styleUrls: [ '../file-picker.inside.scss', './local-file-picker.scss' ],
	host: { class: 'cub-file-picker-inside cub-local-file-picker' },
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: CUBFilePickerInside,
			useExisting: forwardRef(
				() => CUBLocalFilePickerComponent
			),
		},
	],
})
export class CUBLocalFilePickerComponent
	extends CUBFilePickerInside {

	@Input() public authorizedKey: string;
	@Input() public requestUrl: string;

	protected isFileDropOver: boolean;
	protected validCount: number;
	protected uploadingPercent: number;

	private _inputEle: HTMLInputElement;

	get accept(): string {
		if ( this.fileAccept ) {
			return this.fileAccept as string;
		}

		if ( this.imageOnly ) {
			return 'image/*';
		}
	}

	get isUploading(): boolean {
		return this.uploadingPercent > 0
			&& this.uploadingPercent < 100;
	}

	/**
	 * @constructor
	 * @param {CUBFileService} fileService
	 * @param {number} FILE_SIZE_LIMIT
	 */
	constructor(
		@Optional() @Inject( CUB_FILE_SERVICE )
		protected readonly fileService: CUBFileService,
		@Optional() @Inject( CUB_LOCAL_FILE_SIZE_LIMIT )
		protected readonly FILE_SIZE_LIMIT: number
	) {
		super();
	}

	/**
	 * @param {DragEvent} e
	 * @return {void}
	 */
	protected onFileDragOver(
		e: DragEvent
	) {
		e.stopPropagation();
		e.preventDefault();

		this.isFileDropOver = true;
	}

	/**
	 * @param {DragEvent} e
	 * @return {void}
	 */
	protected onFileDragLeave(
		e: DragEvent
	) {
		e.stopPropagation();
		e.preventDefault();

		this.isFileDropOver = false;
	}

	/**
	 * @param {DragEvent} e
	 * @return {void}
	 */
	protected onFileDropped(
		e: DragEvent
	) {
		e.preventDefault();

		this.isFileDropOver = false;

		this._onPicked(
			e.dataTransfer.files
		);
	}

	/**
	 * @param {CUBFileExtra} file
	 * @return {void}
	 */
	protected override onFileRemoved(
		file: CUBFileExtra
	) {
		super.onFileRemoved( file );

		if ( file.invalid ) {
			return;
		}

		this.validCount--;
	}

	/**
	 * @return {void}
	 */
	protected pick() {
		const inputEle: HTMLInputElement
			= this._inputEle
				|| this._createHTMLInputElement();

		inputEle.click();
	}

	/**
	 * @param {string=} requestUrl
	 * @return {void}
	 */
	protected upload(
		requestUrl: string = this.requestUrl
	) {
		if ( !this.fileService ) {
			throw new Error(
				'Missing file service.'
			);
		}

		const validFiles: CUBFile[] = [];
		const nativeFiles: File[] = [];

		_.forEach(
			this.pickedFiles,
			( file: CUBFileExtra ) => {
				if ( file.invalid ) {
					return;
				}

				validFiles.push( file );
				nativeFiles.push( file.metadata );
			}
		);

		this
		.fileService
		.upload(
			{ files: nativeFiles },
			this.authorizedKey,
			{
				reportProgress: true,
				observe: 'events',
			},
			requestUrl
		)
		.pipe( untilCmpDestroyed( this ) )
		.subscribe({
			next: ( {
				type,
				body,
			}: CUBUploadFileResponse ) => {
				if ( type === 4 ) {
					for (
						const [ index, uploadedFile ]
						of
						body.entries()
					){
						validFiles[ index ]
							= {
								id: uploadedFile.id,
								fileName: uploadedFile.fileName,
								mimeType: uploadedFile.mimeType,
								size: uploadedFile.size,
								url: uploadedFile.url,
								source: CUBFileSource.Local,
								createdAt: uploadedFile.createdAt,
								thumbnailUrl: uploadedFile.thumbnailUrl,
								metadata: uploadedFile,
							};
					}

					this.done( validFiles );
				}
			},
			error: () => {
				this.uploadingPercent = null;

				this.cdRef.markForCheck();
			},
			complete: () => {
				this.uploadingPercent = null;

				this.cdRef.markForCheck();
			},
		});
	}

	/**
	 * @param {FileList} fileList
	 * @return {void}
	 */
	private _onPicked(
		fileList: FileList
	) {
		let validCount: number
			= this.validCount || 0;

		_.forEach(
			Array.from( fileList ),
			( file: File ) => {
				const invalid: boolean
					= file.size > this.FILE_SIZE_LIMIT;

				this.addFile(
					{
						fileName: file.name,
						mimeType: file.type,
						size: file.size,
						url: URL.createObjectURL( file ),
						source: CUBFileSource.Local,
						metadata: file,
						get invalid(): boolean {
							return invalid;
						},
					} as CUBFileExtra
				);

				if ( invalid ) {
					return;
				}

				validCount++;
			}
		);

		this.validCount = validCount;

		this.cdRef.markForCheck();
	}

	/**
	 * @return {HTMLInputElement}
	 */
	private _createHTMLInputElement(): HTMLInputElement {
		const input: HTMLInputElement
			= document.createElement( 'input' );

		input.setAttribute(
			'type',
			'file'
		);
		input.setAttribute(
			'accept',
			this.accept
				|| undefined
		);
		input.setAttribute(
			'multiple',
			_.toString( this.multiSelect )
				|| undefined
		);

		input.onchange
			= ( e: InputEvent ) => {
				this._onPicked(
					( e.target as HTMLInputElement ).files
				);

				input.value = '';
			};

		return this._inputEle = input;
	}

}
