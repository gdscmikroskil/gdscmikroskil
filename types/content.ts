export type LinkContent = {
  _id: string;
  title: string;
  url: string;
  category: Reference;
  description: string;
  _type: 'link';
  _rev: string;
  _createdAt: string;
  _updatedAt: string;
};

export type CategoryContent = {
  _id: string;
  icon: Image;
  title: string;
  _type: 'category';
  _rev: string;
  _updatedAt: string;
  _createdAt: string;
};

export type CategoryWithLinksContent = CategoryContent & {
  links: LinkContent[];
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
