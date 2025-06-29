import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import post from './schemaTypes/post'
import category from './schemaTypes/category'
import author from './schemaTypes/author';

export default defineConfig({
  name: 'default',
  title: 'jewel-in-the-mines',

  projectId: 'c0cnt21y',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: [post, category, author],
  },
})
