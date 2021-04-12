import { toQueryParams } from './loopback-rest';

describe('Test queryParam', () => {
  it('Serialize simple object', () => {
    const obj = { p1: '21das', p2: 232, p3: false };
    const queryParams = toQueryParams('filter', obj);
    expect(queryParams).toEqual(
      '?filter[p1]=21das&filter[p2]=232&filter[p3]=false'
    );
  });

  it('Serialize nested object', () => {
    const obj = {
      o1: {
        p1: '21das',
        p2: 232,
        p3: false,
      },
    };
    const queryParams = toQueryParams('filter', obj);
    expect(queryParams).toEqual(
      '?filter[o1][p1]=21das&filter[o1][p2]=232&filter[o1][p3]=false'
    );
  });

  it('Serialize object with array', () => {
    const obj = {
      o1: ['21das', 232, false],
    };
    const queryParams = toQueryParams('filter', obj);
  });

  fit('Serialize array of nested object', () => {
    const obj = {
      o2: ['2'],
      o1: ['21das', '232', 'false'],
    };
    const queryParams = toQueryParams('filter', obj);
    expect(queryParams).toEqual(
      '?filter[o2][0]=2&filter[o1][0]=21das&filter[o1][1]=232&filter[o1][2]=false'
    );
  });
});
