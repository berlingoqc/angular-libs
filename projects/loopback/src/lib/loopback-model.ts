export interface AnyObject {
  [property: string]: any;
}

export interface Paging {
  offset?: number;
  limit?: number;
  skip?: number;
  fields?: { [id: string]: boolean };
  order?: string[];
}

export interface Include extends Paging {
  relation: string;
  scope?: Filter;
}

export interface Filter<T extends object = any> extends Paging {
  where?: Where<T>;
  include?: Include[];
}

export class Count {
  count: number;
}

// COPIER DEPUIS https://github.com/strongloop/loopback-next/blob/master/packages/repository/src/query.ts

/**
 * Operators for where clauses
 */
export type Operators =
  | 'eq' // Equal
  | 'neq' // Not Equal
  | 'gt' // >
  | 'gte' // >=
  | 'lt' // <
  | 'lte' // <=
  | 'inq' // IN
  | 'nin' // NOT IN
  | 'between' // BETWEEN [val1, val2]
  | 'exists'
  | 'and' // AND
  | 'or' // OR
  | 'like' // LIKE
  | 'nlike' // NOT LIKE
  | 'ilike' // ILIKE'
  | 'nilike' // NOT ILIKE
  | 'regexp'; // REGEXP'

/**
 * Matching predicate comparison
 */
export interface PredicateComparison<PT> {
  eq?: PT;
  neq?: PT;
  gt?: PT;
  gte?: PT;
  lt?: PT;
  lte?: PT;
  inq?: PT[];
  nin?: PT[];
  between?: [PT, PT];
  exists?: boolean;
  like?: PT;
  nlike?: PT;
  ilike?: PT;
  nilike?: PT;
  regexp?: string | RegExp;
  // [extendedOperation: string]: any;
}

/**
 * Value types for `{propertyName: value}`
 */
export type ShortHandEqualType = string | number | boolean | Date;

/**
 * Key types of a given model, excluding operators
 */
export type KeyOf<MT extends object> = Exclude<
  Extract<keyof MT, string>,
  Operators
>;

/**
 * Condition clause
 *
 * @example
 * ```ts
 * {
 *   name: {inq: ['John', 'Mary']},
 *   status: 'ACTIVE',
 *   age: {gte: 40}
 * }
 * ```
 */
export type Condition<MT extends object> = {
  [P in KeyOf<MT>]?:
    | PredicateComparison<MT[P]> // {x: {lt: 1}}
    | (MT[P] & ShortHandEqualType); // {x: 1},
};

/**
 * Where clause
 *
 * @example
 * ```ts
 * {
 *   name: {inq: ['John', 'Mary']},
 *   status: 'ACTIVE'
 *   and: [...],
 *   or: [...],
 * }
 * ```
 */
export type Where<MT extends object = AnyObject> =
  | Condition<MT>
  | AndClause<MT>
  | OrClause<MT>;

/**
 * And clause
 *
 * @example
 * ```ts
 * {
 *   and: [...],
 * }
 * ```
 */
export interface AndClause<MT extends object> {
  and: Where<MT>[];
}

/**
 * Or clause
 *
 * @example
 * ```ts
 * {
 *   or: [...],
 * }
 * ```
 */
export interface OrClause<MT extends object> {
  or: Where<MT>[];
}

/**
 * Order by direction
 */
export type Direction = 'ASC' | 'DESC';
