// tried to refactor a procedural leaf generator that https://davideprati.com/ made to fit react-three-fiber 
// but the face3 element is deprecated in @react-three-fiber and now calls for vertices coordinates that I don't know enough vector math to figure out yet

import {Vector3, Vector2, Face3, Geometry} from 'three';

export default function Leaf() {
  let length=18;
  let length_stem=1;
  let width_stem=0.4;
  let leaf_width=1;
  let leaf_up=0.5;
  let density=26;
  let positive_curvature=0.031;
  let positive_curvature_border=0.047;
  let leaf_inclination=1;

  //leaf_width it's a value that goes from 0.1 to 1.0
  let curvature = positive_curvature * -1.0;
  let curvature_border = positive_curvature_border * -1.0;
  let min_length_stem = (length_stem <= 0) ? 0.1 : length_stem;
  let n_discard_leaf = 4; //number of leaf skipped at the end
  let available_length = length - min_length_stem;
  let leaf_z_space = available_length/density; //length that each leaf occupies on the z axis, padding included
  let y = 0;
  let x = 0;
  let current_z = 0;
  let key_last_vertex = 0;
  let z_zero = length/2.0;
  let y_zero = getPointZero(curvature, length);
  let x_zero = getPointZero(curvature_border, length);
  let vertices = [];
  let faces = [];
  let n_leaves = (Math.abs(density - n_discard_leaf));
  let stem_decrease_value = width_stem / (n_leaves * 2);

  //draw stem
  vertices.push(new Vector3(-width_stem/2, y, current_z));
  vertices.push(new Vector3(width_stem/2, y, current_z));
  vertices.push(new Vector3(-width_stem/2, -width_stem, current_z));
  vertices.push(new Vector3(width_stem/2, -width_stem, current_z));
  current_z += min_length_stem;
  y = getVauleOnParabola(curvature, current_z, z_zero, y_zero );
  width_stem -= stem_decrease_value;
  vertices.push(new Vector3((-width_stem/2), y, min_length_stem));
  vertices.push(new Vector3((width_stem/2), y, min_length_stem));
  vertices.push(new Vector3((-width_stem/2), y-width_stem, min_length_stem));
  vertices.push(new Vector3((width_stem/2), y-width_stem, min_length_stem));
  faces.push(new Face3(0, 1, 3));
  faces.push(new Face3(0, 3, 2));
  faces.push(new Face3(0, 4, 1));
  faces.push(new Face3(1, 4, 5));
  faces.push(new Face3(2, 4, 0));
  faces.push(new Face3(1, 5, 3));
  faces.push(new Face3(4, 2, 6));
  faces.push(new Face3(5, 7, 3));
  faces.push(new Face3(5, 4, 6));
  faces.push(new Face3(6, 7, 5));
  faces.push(new Face3(2, 3, 7));
  faces.push(new Face3(7, 6, 2));
  key_last_vertex = 7;
  let apertura = leaf_z_space * leaf_width;
  let space_between_leaves = leaf_z_space - apertura;
  for (let i = 0; i< n_leaves; i++) {
      //draw stem between the leaves
      current_z += apertura;
      y = getVauleOnParabola(curvature, current_z, z_zero, y_zero );
      width_stem -= stem_decrease_value;
      vertices.push(new Vector3((-width_stem/2), y, current_z));
      vertices.push(new Vector3((width_stem/2), y, current_z));
      vertices.push(new Vector3((-width_stem/2), y-width_stem, current_z));
      vertices.push(new Vector3((width_stem/2), y-width_stem, current_z));
      faces.push(new Face3(key_last_vertex-3, key_last_vertex-1, key_last_vertex));
      faces.push(new Face3(key_last_vertex, key_last_vertex-2, key_last_vertex-3));
      faces.push(new Face3(key_last_vertex-2, key_last_vertex-3, key_last_vertex+1));
      faces.push(new Face3(key_last_vertex+1, key_last_vertex+2, key_last_vertex-2));
      faces.push(new Face3(key_last_vertex+1, key_last_vertex+3, key_last_vertex+4));
      faces.push(new Face3(key_last_vertex+4, key_last_vertex+2, key_last_vertex+1));
      faces.push(new Face3(key_last_vertex-1, key_last_vertex+3, key_last_vertex+4));
      faces.push(new Face3(key_last_vertex-1, key_last_vertex, key_last_vertex+4));
      faces.push(new Face3(key_last_vertex+4, key_last_vertex+3, key_last_vertex-1));
      key_last_vertex += 4;
      //11
      //leaf dx, looking from the beginning of the stem in direction end of the leaf
      let inclined_z = (current_z + (leaf_z_space*4) * leaf_inclination);
      let z_foglia = (inclined_z >= length) ? length: inclined_z;
      x = getVauleOnParabola(curvature_border, z_foglia, z_zero, x_zero );
      vertices.push(new Vector3(
          (-width_stem/2 + (x * -1)),
          getVauleOnParabola(curvature, z_foglia, z_zero, y_zero ) + leaf_up,
          z_foglia));
      faces.push(new Face3(key_last_vertex-7, key_last_vertex+1, key_last_vertex-3));
      faces.push(new Face3(key_last_vertex+1, key_last_vertex-7, key_last_vertex-5));
      faces.push(new Face3(key_last_vertex-1, key_last_vertex-3, key_last_vertex+1));
      faces.push(new Face3(key_last_vertex-5, key_last_vertex-1, key_last_vertex+1));
      key_last_vertex += 1;
      //12
 

  // //leaf sx
  x = getVauleOnParabola(curvature_border, z_foglia, z_zero, x_zero );
  vertices.push(new Vector3(
      (width_stem/2 + x),
      getVauleOnParabola(curvature, z_foglia, z_zero, y_zero ) + leaf_up,
      z_foglia));

  faces.push(new Face3(key_last_vertex-7, key_last_vertex-3, key_last_vertex+1));
  faces.push(new Face3( key_last_vertex-7,key_last_vertex+1, key_last_vertex-5));
  faces.push(new Face3(key_last_vertex+1, key_last_vertex-3, key_last_vertex-1));
  faces.push(new Face3(key_last_vertex-1, key_last_vertex-5, key_last_vertex+1));
  key_last_vertex += 1;
  //13

  //draw the stem between the leaves, unless it is not the last iteration
  if (!(i === n_leaves -1)) {
      current_z += space_between_leaves;
      y = getVauleOnParabola(curvature, current_z, z_zero, y_zero );
      width_stem -= stem_decrease_value;
      vertices.push(new Vector3((-width_stem/2), y, current_z));
      vertices.push(new Vector3((width_stem/2), y, current_z));
      vertices.push(new Vector3((-width_stem/2), y-width_stem, current_z));
      vertices.push(new Vector3((width_stem/2), y-width_stem, current_z));

      faces.push(new Face3(key_last_vertex-4, key_last_vertex-5, key_last_vertex+1));
      faces.push(new Face3(key_last_vertex+1, key_last_vertex+2, key_last_vertex-4));
      faces.push(new Face3(key_last_vertex+2, key_last_vertex+1, key_last_vertex+3));//front
      faces.push(new Face3(key_last_vertex+3, key_last_vertex+3, key_last_vertex+2));
      faces.push(new Face3(key_last_vertex-3, key_last_vertex-2, key_last_vertex+4));//bottom
      faces.push(new Face3(key_last_vertex+4, key_last_vertex+3, key_last_vertex-3));

      faces.push(new Face3(key_last_vertex+1, key_last_vertex-5, key_last_vertex-3));
      faces.push(new Face3(key_last_vertex-3, key_last_vertex+3, key_last_vertex+1));

      faces.push(new Face3(key_last_vertex-2, key_last_vertex-4, key_last_vertex+2));
      faces.push(new Face3(key_last_vertex+2, key_last_vertex+4, key_last_vertex-2));
      key_last_vertex += 4;
      //17
  }
}

const geom = new Geometry();
geom.vertices = vertices;
geom.faces = faces;
geom.computeFaceNormals();
assignUVs(geom);
return geom;
}

function assignUVs(geometry) {
  geometry.faceVertexUvs[0] = [];
        geometry.faces.forEach(function(face) {
            var components = ['x', 'y', 'z'].sort(function(a, b) {
                return Math.abs(face.normal[a]) > Math.abs(face.normal[b]);
            });

            var v1 = geometry.vertices[face.a];
            var v2 = geometry.vertices[face.b];
            var v3 = geometry.vertices[face.c];

            geometry.faceVertexUvs[0].push([
                new Vector2(v1[components[0]], v1[components[1]]),
                new Vector2(v2[components[0]], v2[components[1]]),
                new Vector2(v3[components[0]], v3[components[1]])
            ]);

        });
        geometry.uvsNeedUpdate = true;
}

function getVauleOnParabola(curvature, z, z_zero, y_zero) {
  let y = curvature * ((z - z_zero)*(z - z_zero)) + y_zero;
        return y;
}

function getPointZero(curvature, length) {
  return (-1 * curvature) * ((length/2.0)*(length/2.0));
}