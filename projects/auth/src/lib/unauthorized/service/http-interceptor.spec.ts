import { nointercept } from "./http-interceptor";

class TestE {

  @nointercept(400)
  funct() {
    console.log('2');
  }
}

describe('Test http interceptor', () => {

  it('AAHAH', () => {
    const e = new TestE();
    e.funct();
  })

});
