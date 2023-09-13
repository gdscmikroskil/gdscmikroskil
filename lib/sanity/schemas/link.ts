import {
  orderRankField,
  orderRankOrdering,
} from '@sanity/orderable-document-list';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'link',
  title: 'Link',
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
      name: 'description',
      title: 'Description',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'string',
      validation: (Rule) =>
        Rule.required().custom((value) => {
          try {
            const url = new URL(value!);

            const allowedProtocols = ['http:', 'https:', 'action:'];
            if (!allowedProtocols.includes(url.protocol)) {
              throw new Error('Protocol is not allowed');
            }

            return true;
          } catch (error) {
            return 'URL field can be a valid url (https://...) or an action (action:...)';
          }
        }),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: { type: 'category' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'group',
      title: 'Group',
      type: 'reference',
      to: { type: 'group' },
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
    orderRankField({ type: 'link' }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category.title',
      status: 'active',
    },
    prepare(selection) {
      const { title, subtitle, status } = selection;
      return {
        // 🟢 = active 🔴 = inactive
        title: `${status ? '🟢' : '🔴'} ${title}`,
        subtitle: subtitle,
      };
    },
  },
});
