/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import {
	WorkspaceFolder
} from 'vscode-languageclient/node';

import { Is } from './utils';

export enum Validate {
	on = 'on',
	off = 'off',
	probe = 'probe'
}

export type CodeActionSettings = {
	disableRuleComment: {
		enable: boolean;
		location: 'separateLine' | 'sameLine';
	};
	showDocumentation: {
		enable: boolean;
	};
};

export enum CodeActionsOnSaveMode {
	all = 'all',
	problems = 'problems'
}

export namespace CodeActionsOnSaveMode {
	export function from(value: string | undefined | null): CodeActionsOnSaveMode {
		if (value === undefined || value === null || !Is.string(value)) {
			return CodeActionsOnSaveMode.all;
		}
		switch(value.toLowerCase()) {
			case CodeActionsOnSaveMode.problems:
				return CodeActionsOnSaveMode.problems;
			default:
				return CodeActionsOnSaveMode.all;
		}
	}
}

export namespace CodeActionsOnSaveRules {
	export function from(value: string[] | undefined | null): string[] | undefined {
		if (value === undefined || value === null || !Array.isArray(value)) {
			return undefined;
		}
		return value.filter(item => Is.string(item));
	}
}

export type CodeActionsOnSaveSettings = {
	enable: boolean;
	mode: CodeActionsOnSaveMode,
	rules?: string[]
};

export enum ESLintSeverity {
	off = 'off',
	warn = 'warn',
	error = 'error'
}

export namespace ESLintSeverity {
	export function from(value: string | undefined | null): ESLintSeverity {
		if (value === undefined || value === null) {
			return ESLintSeverity.off;
		}
		switch (value.toLowerCase()) {
			case ESLintSeverity.off:
				return ESLintSeverity.off;
			case ESLintSeverity.warn:
				return ESLintSeverity.warn;
			case ESLintSeverity.error:
				return ESLintSeverity.error;
			default:
				return ESLintSeverity.off;
		}
	}
}

export enum RuleSeverity {
	// Original ESLint values
	info = 'info',
	warn = 'warn',
	error = 'error',
	off = 'off',

	// Added severity override changes
	default = 'default',
	downgrade = 'downgrade',
	upgrade = 'upgrade'
}

export type RuleCustomization = {
	rule: string;
	severity: RuleSeverity;
};

export type RunValues = 'onType' | 'onSave';

export enum ModeEnum {
	auto = 'auto',
	location = 'location'
}

export namespace ModeEnum {
	export function is(value: string): value is ModeEnum {
		return value === ModeEnum.auto || value === ModeEnum.location;
	}
}

export type ModeItem = {
	mode: ModeEnum
};

export namespace ModeItem {
	export function is(item: any): item is ModeItem {
		const candidate = item as ModeItem;
		return candidate && ModeEnum.is(candidate.mode);
	}
}

export type DirectoryItem = {
	directory: string;
	'!cwd'?: boolean;
};

export namespace DirectoryItem {
	export function is(item: any): item is DirectoryItem {
		const candidate = item as DirectoryItem;
		return candidate && Is.string(candidate.directory) && (Is.boolean(candidate['!cwd']) || candidate['!cwd'] === undefined);
	}
}

export type ConfigurationSettings = {
	validate: Validate;
	packageManager: 'npm' | 'yarn' | 'pnpm';
	useESLintClass: boolean;
	codeAction: CodeActionSettings;
	codeActionOnSave: CodeActionsOnSaveSettings;
	format: boolean;
	quiet: boolean;
	onIgnoredFiles: ESLintSeverity;
	options: any | undefined;
	rulesCustomizations: RuleCustomization[];
	run: RunValues;
	nodePath: string | null;
	workspaceFolder: WorkspaceFolder | undefined;
	workingDirectory: ModeItem | DirectoryItem | undefined;
};