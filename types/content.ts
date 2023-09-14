import { VariantProps } from 'class-variance-authority';

import { buttonVariants } from '~/components/ui/button';

export type LinkContent = {
  _id: string;
  title: string;
  url: string;
  category: Reference;
  description: string;
  variant: VariantProps<typeof buttonVariants>['variant'];
  _type: 'link';
  _rev: string;
  _createdAt: string;
  _updatedAt: string;
};

export type CategoryContent = {
  _id: string;
  icon: Image;
  title: string;
  slug: {
    _type: 'slug';
    current: string;
  };
  _type: 'category';
  _rev: string;
  _updatedAt: string;
  _createdAt: string;
};

export type GroupContent = {
  _id: string;
  title: string;
  description: string;
  _type: 'group';
  _updatedAt: string;
  _createdAt: string;
};

export type LinkWithGroupContent = LinkContent & {
  group: GroupContent | null;
};

export type CategoryWithLinksContent = CategoryContent & {
  links: LinkWithGroupContent[];
};

type Reference = {
  _ref: string;
  _type: 'reference';
};

type Image = {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
};
