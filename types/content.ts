export type LinkContent = {
  title: string;
  _updatedAt: string;
  url: string;
  _createdAt: string;
  _rev: string;
  category: CategoryContent;
  _type: string;
  description: string;
  _id: string;
};

export type CategoryContent = {
  _rev: string;
  _type: string;
  icon: Icon;
  _id: string;
  title: string;
  _updatedAt: string;
  _createdAt: string;
};

type Icon = {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
};
