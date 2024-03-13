import express from "express";
import pg from "pg";

const app = express();
const postgresql = new pg.Pool({ user: "postgres" });
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/api/kommuner", async (req, res) => {
  const dbResult = await postgresql.query(
    `select kommunenavn, kommunenummer,
                st_simplify(st_transform(omrade, 4326), 0.001)::json geometry
         from kommuner_e1b95ab2fb054ee7998946cce6039771.kommune
        `,
  );
  res.json({
    type: "FeatureCollection",
    features: dbResult.rows.map((row) => ({
      type: "Feature",
      geometry: row.geometry,
      properties: {
        id: row.kommunenummer,
        name: row.kommunenavn,
      },
    })),
  });
});

app.get("/api/adresser", async (req, res) => {
  const dbResult =
    await postgresql.query(`select representasjonspunkt::json, kommunenavn, navnerom from matrikkelenadresse_67433ff2407e490383ace6b0c98a8564.matrikkeladresse where kommunenavn = 'OSLO';
`);

  /*{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [125.6, 10.1]
  },
  "properties": {
    "name": "Dinagat Islands"
  }
}*/

  res.json(
    dbResult.rows.map((row) => ({
      type: "Feature",
      geometry: {
        type: row.type,
        coordinates: row.representasjonspunkt,
      },
      properties: {
        name: row.navnerom,
      },
    })),
  );
});

app.listen(3000);
