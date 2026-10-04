import { favorites } from "@/lib/db";
import { addFavorite, removeFavorite } from "@/lib/services/favoriteService";

beforeEach(() => {
  favorites.length = 0;
});

describe("favoriteService", () => {
  test("addFavorite berhasil menyimpan data valid", () => {
    const result = addFavorite({ id: 1, name: "Ayu" });

    expect(result.success).toBe(true);
    expect(result.status).toBe(201);
    expect(favorites).toHaveLength(1);
  });
});