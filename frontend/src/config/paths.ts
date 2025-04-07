export const paths = {
  home: {
    getHref: () => '/',
  },
  customers: {
    getHref: () => '/customers',

    insights: {
      getHref: () => '/customers/insights',
    },
  },
} as const;
