import * as React from 'react';
import { Editor, Transforms, Text } from 'slate';
import { BiBold } from 'react-icons/bi';

import { Richtext } from './index';
import { toggleMark } from '../../../customize/extras.js';
import { SetGenerator, UnsetGenerator, InsertGenerator } from '../../../customize/elements/actionGenerator';

import styles from './leaf.module.css';

const name = 'bold';
const command = 'b';
const type = 'inline';

const set = ({ event, editor, at, meta }) => Editor.addMark(editor, name, true);
const unset = ({ event, editor, at, meta }) => Editor.removeMark(editor, name);
const insert = InsertGenerator({ name, type });

const create = ({ text }) => ({
    element: name,
    type,
    bold: true,
    text,
});


const Element = (props) => (
    <Richtext {...props} />
);

const definition = {
    name,
    command,
    icon: BiBold,
    component: Element,
    type,

    create,

    set,
    unset,
    insert,
};

export default definition;