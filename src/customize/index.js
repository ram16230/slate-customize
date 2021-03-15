// @flow
import { withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { useMemo } from 'react';
import { Transforms } from 'slate';

import type { ElementDefinitionType, ElementsDefinitionTypes } from './elements';

import { deserializeHTML } from './serializer';
import { CleanHistory } from './history';
import withCommands from './commands';
import { iterateValue } from './extras'
import Tokenize from './commands/tokenizer';

const withCustomInlines = (elements: Array<string>): ((Object) => Object) => {
    return (editor) => {
        editor.isInline = (node) => {
            return elements.includes(node.element ? node.element : '');
        }
        return editor;
    }
};

const withCopyPasteWithStyles = (editor: Object): Object => {
    const { insertData } = editor;
    editor.insertData = data => {
        const html = data.getData('text/html');

        if (html) {
            const parsed = new DOMParser().parseFromString(html, 'text/html');
            const fragment = deserializeHTML(parsed.body);
            Transforms.insertFragment(editor, fragment);
            CleanHistory(editor);
            return;
        }
        insertData(data);
    }
    return editor;
}

export const withCustomize = (editor: Object, elements: ElementsDefinitionTypes): Object => {
    const inlines = Object.keys(elements)
        .map(key => elements[key])
        .filter((element: ElementDefinitionType) => element.type === "inline")
        .map(element => element.name)

    console.log(inlines);
    const withInlines = withCustomInlines(inlines);

    editor = withReact(editor, []);
    editor = withHistory(editor, []);

    editor = withInlines(editor);
    editor = withCommands(editor);
    editor = withCopyPasteWithStyles(editor);
    console.log(editor);

    return useMemo(() => editor, []); // TODO: take advantage of memoization
}

export const iterateSlateValue = iterateValue;