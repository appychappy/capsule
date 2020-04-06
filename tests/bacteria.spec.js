import Bacteria from "../scripts/bacteria.js";

const getRadiusCount = Bacteria.__get__("getRadiusCount");

describe("[Bacteria]", () => {
  describe("[reset]", () => {
    it("should reset liveBacteria state", () => {
      let LiveBacteria;
      Bacteria.__set__("liveBacteria", [
        "1,2",
        "1,3",
        "1,4",
        "2,2",
        "2,3",
        "2,4",
        "3,2",
        "3,3",
        "3,4",
      ]);
      LiveBacteria = Bacteria.__get__("liveBacteria");
      expect(LiveBacteria.length).toBe(9);

      Bacteria.reset();
      LiveBacteria = Bacteria.__get__("liveBacteria");
      expect(LiveBacteria.length).toBe(0);
    });
  });

  describe("[getRadiusCount]", () => {
    describe("should successfully count live bacteria", () => {
      beforeEach(() => {
        Bacteria.reset();
        Bacteria.__set__("liveBacteria", [
          "1,2",
          "1,3",
          "1,4",
          "2,2",
          "2,3",
          "2,4",
          "3,2",
          "3,3",
          "3,4",
        ]);
      });
      it("should return 2 surrounding liveBacteria, when cell is 0,2", () => {
        expect(getRadiusCount("0,2")).toBe(2);
      });
      it("should return 8 surrounding liveBacteria, when cell is 2,3", () => {
        expect(getRadiusCount("2,3")).toBe(8);
      });
      it("should return 0 surrounding liveBacteria, when cell is 0,0", () => {
        expect(getRadiusCount("0,0")).toBe(0);
      });
    });

    describe("should successfully count live bacteria, when cell is at the edge", () => {
      beforeEach(() => {
        Bacteria.reset();
        Bacteria.__set__("liveBacteria", [
          "0,0",
          "0,1",
          "0,2",
          "1,0",
          "1,1",
          "1,2",
          "2,0",
          "2,1",
          "2,2",
        ]);
      });
      it("should return 3 surrounding liveBacteria, when cell is 0,0", () => {
        expect(getRadiusCount("0,0")).toBe(3);
      });
      it("should return 2 surrounding liveBacteria, when cell is 0,3", () => {
        expect(getRadiusCount("0,3")).toBe(2);
      });
    });
  });

  describe("[addCell]", () => {
    it("should successfully add a new liveBacteria when passed new location", () => {
      Bacteria.reset();

      Bacteria.addCell("1-3");
      const LiveBacteria = Bacteria.__get__("liveBacteria");
      expect(LiveBacteria.length).toBe(1);
      expect(LiveBacteria).toEqual(["1,3"]);
    });
    it("should successfully add multiple liveBacteria when passed new locations", () => {
      Bacteria.reset();
      Bacteria.addCell("1-3");
      Bacteria.addCell("1-4");
      const LiveBacteria = Bacteria.__get__("liveBacteria");
      expect(LiveBacteria.length).toBe(2);
      expect(LiveBacteria).toEqual(["1,3", "1,4"]);
    });
    it("should not add same location twice", () => {
      Bacteria.reset();
      Bacteria.addCell("0-1");
      Bacteria.addCell("0-1");
      const LiveBacteria = Bacteria.__get__("liveBacteria");
      expect(LiveBacteria.length).toBe(1);
      expect(LiveBacteria).toEqual(["0,1"]);
    });
  });

  describe("[getLiveBacteria]", () => {
    it("should return array of live bacteria", () => {
      Bacteria.reset();
      Bacteria.addCell("0-1");
      const LiveBacteria = Bacteria.__get__("liveBacteria");
      expect(LiveBacteria.length).toBe(1);
      expect(LiveBacteria).toEqual(["0,1"]);
      expect(Array.isArray([LiveBacteria])).toBe(true);
    });
  });

  describe("[createGrid]", () => {
    it("should build 10 by 10 grid", () => {
      Bacteria.__set__("grid", []);
      Bacteria.createGrid();
      const Grid = Bacteria.__get__("grid");
      expect(Grid.length).toBe(100);
    });
  });

  describe("[calculateGrowth]", () => {
    it("calcualte new bacteria, given in example", () => {
      Bacteria.reset();
      Bacteria.__set__("grid", []);
      Bacteria.createGrid();
      Bacteria.__set__("liveBacteria", ["1,2", "2,2", "3,2"]);
      Bacteria.calculateGrowth();
      const LiveBacteria = Bacteria.__get__("liveBacteria");
      expect(LiveBacteria.length).toBe(3);
      expect(LiveBacteria).toEqual(["2,1", "2,2", "2,3"]);
    });
  });
});
