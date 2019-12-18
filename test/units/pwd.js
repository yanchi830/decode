const { getAllPwds } = require('../../pwd');

describe('pwd.js', () => {
  describe('.getAllPwds', () => {
    it('should pass', () => {
      expect(getAllPwds(0, 3)).to.deep.equal([0, 1, 2, 3]);
    });

    it('should pass', () => {
      expect(getAllPwds(5, 8)).to.deep.equal([5, 6, 7, 8]);
    });
  });
});
