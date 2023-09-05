import {
  orderRankField,
  orderRankOrdering,
} from '@sanity/orderable-document-list';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      options: {
        accept: 'image/svg+xml',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
    orderRankField({ type: 'category' }),
  ],
  preview: {
    select: {
      title: 'title',
      status: 'active',
      icon: 'icon',
    },
    prepare(selection) {
      const { title, status, icon } = selection;
      return {
        // 🟢 = active 🔴 = inactive
        title: `${status ? '🟢' : '🔴'} ${title}`,
        media: icon,
      };
    },
  },
});
