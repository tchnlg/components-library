export const newCategory = {
  uuid: "",
  level: "",
  slug: "",
  title: "",
};

export const category1 = {
  uuid: "4000017689000004",
  level: 1,
  slug: "zdg",
  title: "ZDG",
};

export const category2 = {
  uuid: "4000017689000001",
  level: 2,
  slug: "vitamine",
  title: "Vitamine",
  parent: {
    uuid: "4000017689000000",
    level: 1,
    slug: "pseudogetreide",
    title: "Pseudogetreide",
  },
};

export const categories = [
  {
    uuid: "4000017689000000",
    level: 1,
    slug: "pseudogetreide",
    title: "Pseudogetreide",
  },
  {
    uuid: "4000017689000001",
    level: 2,
    slug: "vitamine",
    title: "Vitamine",
    parent: {
      uuid: "4000017689000000",
      level: 1,
      slug: "pseudogetreide",
      title: "Pseudogetreide",
    },
  },
  {
    uuid: "4000017689000002",
    level: 3,
    slug: "proteine",
    title: "Proteine",
    parent: {
      uuid: "4000017689000001",
      level: 2,
      slug: "vitamine",
      title: "Vitamine",
      parent: {
        uuid: "4000017689000000",
        level: 1,
        slug: "pseudogetreide",
        title: "Pseudogetreide",
      },
    },
  },
  {
    uuid: "4000017689000003",
    level: 0,
    slug: "cholesterin",
    title: "Cholesterin",
    parent: {
      uuid: "4000017689000002",
      level: 3,
      slug: "proteine",
      title: "Proteine",
      parent: {
        uuid: "4000017689000001",
        level: 2,
        slug: "vitamine",
        title: "Vitamine",
        parent: {
          uuid: "4000017689000000",
          level: 1,
          slug: "pseudogetreide",
          title: "Pseudogetreide",
        },
      },
    },
  },
  {
    uuid: "4000017689000004",
    level: 1,
    slug: "zdg",
    title: "ZDG",
  },
  {
    uuid: "4000017689000005",
    level: 2,
    slug: "magnesium",
    title: "Magnesium",
    parent: {
      uuid: "4000017689000004",
      level: 1,
      slug: "zdg",
      title: "ZDG",
    },
  },
  {
    uuid: "4000017689000006",
    level: 3,
    slug: "vitamin-d",
    title: "Vitamin D",
    parent: {
      uuid: "4000017689000005",
      level: 2,
      slug: "magnesium",
      title: "Magnesium",
      parent: {
        uuid: "4000017689000004",
        level: 1,
        slug: "zdg",
        title: "ZDG",
      },
    },
  },
  {
    uuid: "4000017689000007",
    level: 0,
    slug: "kochbuecher",
    title: "Kochbücher",
    parent: {
      uuid: "4000017689000006",
      level: 3,
      slug: "vitamin-d",
      title: "Vitamin D",
      parent: {
        uuid: "4000017689000005",
        level: 2,
        slug: "magnesium",
        title: "Magnesium",
        parent: {
          uuid: "4000017689000004",
          level: 1,
          slug: "zdg",
          title: "ZDG",
        },
      },
    },
  },
  {
    uuid: "4000017689000008",
    level: 1,
    slug: "prostatakrebs",
    title: "Prostatakrebs",
  },
  {
    uuid: "4000017689000009",
    level: 2,
    slug: "darmkrebs",
    title: "Darmkrebs",
    parent: {
      uuid: "4000017689000008",
      level: 1,
      slug: "prostatakrebs",
      title: "Prostatakrebs",
    },
  },
];
