describe("index", () => {
  it("greets with Hello World!", () => {
    expect.assertions(3);
    const log = jest.fn();
    const _ = console.log;
    console.log = log;
    try {
      require('../src/index.ts');
      expect(log).toHaveBeenCalled();
      expect(log).toHaveBeenCalledTimes(1);
      expect(log).toHaveBeenCalledWith("Hello World 👋");
    } finally {
      console.log = _;
    }
  });
});
