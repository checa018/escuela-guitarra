
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/estudiantes",
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/estudiantes"
  },
  {
    "renderMode": 2,
    "route": "/cursos"
  },
  {
    "renderMode": 2,
    "route": "/inscripciones"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 5059, hash: 'cdb5f0d15f5a688c519c1fdc9d08f3281e60681f66eb881e22eedaa68aeee98f', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 953, hash: 'b22d6d4a9db73b2fe55153e10fb28b5502ec1c5e82c63c33dcff83a58b8c9242', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'estudiantes/index.html': {size: 17752, hash: '0ab4dedf8da04b65ae30f81ebba949872467bfb0945c3393eb78d48ddf36afd0', text: () => import('./assets-chunks/estudiantes_index_html.mjs').then(m => m.default)},
    'cursos/index.html': {size: 17608, hash: '063603bc5444cf46e1137f4bf2c8d7db965664d937abdccc349a2c623aef9799', text: () => import('./assets-chunks/cursos_index_html.mjs').then(m => m.default)},
    'inscripciones/index.html': {size: 17517, hash: '7db048ce2cbaa54fa35f02811e540c3a6cd9061cf1f65d8b048396060e0745da', text: () => import('./assets-chunks/inscripciones_index_html.mjs').then(m => m.default)},
    'styles-C7ZAZAAO.css': {size: 230932, hash: 'Kv9maSv7MH4', text: () => import('./assets-chunks/styles-C7ZAZAAO_css.mjs').then(m => m.default)}
  },
};
