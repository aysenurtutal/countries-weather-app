export type Filter = {
    value: string;
    matchMode: 'contains' | 'startsWith' | 'endsWith' | 'equals'
        | 'notEquals' | 'in' | 'notIn' | 'lt' | 'lte' | 'gt' | 'gte' | 'custom'
        | 'notContains' | 'between' | 'dateIs' | 'dateIsNot' | 'dateBefore' | 'dateAfter' | undefined;
};

export const customStyles = {
    content: {
        top: '10%',
        left: '10%',
        right: '10%',
        bottom: '10%',
    },
};
