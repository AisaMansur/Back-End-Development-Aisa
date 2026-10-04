const profile = {
  name: "Siti Nur'aisa Mansur",
  role: "peserta bootcamp",
  favoriteTech: ["Next.js", "React", "JavaScript", "Python"],
};

export async function GET() {
  return Response.json(profile);
}