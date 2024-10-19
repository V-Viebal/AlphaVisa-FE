import {
	ULID
} from "ulidx"

import {
	CUBBasicEditorContent
} from "@cub/material";

export type News = {
	id: ULID;
	topic: string;
	thumbnail?: string;
	image?: string;
	description?: string;
	content?: CUBBasicEditorContent;
	createdAt?: string;
	updatedAt?: string;
}

export type NewsMetadata = {
}

export type NewsCreate
	= Partial<Pick<News, 'topic' | 'thumbnail' | 'description'>>;

export type NewsUpdate
	= Partial<Pick<News, 'topic' | 'thumbnail' | 'description'>>;

export enum NewsType {
}
