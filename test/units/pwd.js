const { getAllPwds, fillDigits, sortChunkPwds } = require('../../pwd');

describe('pwd.js', () => {
  describe('.getAllPwds', () => {
    it('should generate passwords in the given range', () => {
      expect(getAllPwds(0, 3)).to.deep.equal([0, 1, 2, 3]);
    });

    it('should generate passwords in the given range', () => {
      expect(getAllPwds(5, 8)).to.deep.equal([5, 6, 7, 8]);
    });

    it('should generate even passwords in the given range', () => {
      expect(getAllPwds(5, 10, (val) => (val % 2) === 0)).to.deep.equal([6, 8, 10]);
    });
  });

  describe('.fillDigits', () => {
    it('should return original value if it is in full digits', () => {
      expect(fillDigits(1234, 4, 0)).to.equal('1234');
    });

    it('should fill empty digits with the given character', () => {
      expect(fillDigits(1234, 8, 'x')).to.equal('xxxx1234');
    });
  });

  describe('.sortChunkPwds', () => {
    it('should only sort a list of passwords if the chunk size is not given', () => {
      expect(sortChunkPwds([3, 5, 1, 10, 11, 2, 4, 6])).to.deep.equal([1, 2, 3, 4, 5, 6, 10, 11]);
    });

    it('should sort a list of passwords and chunk with a given size', () => {
      expect(
        sortChunkPwds([3, 5, 1, 10, 11, 2, 4, 6], 3),
      ).to.deep.equal([
        [1, 2, 3],
        [4, 5, 6],
        [10, 11]
      ]);
    });
  });
});
