// TODO: Provide alternate piece sets

const files = ['a','b','c','d','e','f','g','h'];
const ranks = ['8','7','6','5','4','3','2','1'];
const grid = document.getElementById('grid');

function buildGrid() {
  grid.innerHTML = '';
  grid.appendChild(cellLabel(''));
  for (let f=0; f<8; f++)
    grid.appendChild(cellLabel(files[f].toUpperCase()));
  grid.appendChild(cellLabel(''));
  for (let r=0; r<8; r++) {
    grid.appendChild(cellLabel(ranks[r]));
    for (let f=0; f<8; f++) {
      const sq = document.createElement('div');
      sq.className = 'sq ' + (((r+f)%2===0)?'light':'dark');
      sq.id = files[f] + ranks[r];
      grid.appendChild(sq);
    }
    grid.appendChild(cellLabel(ranks[r]));
  }
  grid.appendChild(cellLabel(''));
  for (let f=0; f<8; f++)
    grid.appendChild(cellLabel(files[f].toUpperCase()));
  grid.appendChild(cellLabel(''));
}

function cellLabel(text) {
  const d = document.createElement('div');
  d.className = 'label';
  d.textContent = text;
  return d;
}

const initialPlacement = {
  a1: 'wr.svg', b1: 'wn.svg', c1: 'wb.svg', d1: 'wq.svg', e1: 'wk.svg', f1: 'wb.svg', g1: 'wn.svg', h1: 'wr.svg',
  a2: 'wp.svg', b2: 'wp.svg', c2: 'wp.svg', d2: 'wp.svg', e2: 'wp.svg', f2: 'wp.svg', g2: 'wp.svg', h2: 'wp.svg',
  a8: 'br.svg', b8: 'bn.svg', c8: 'bb.svg', d8: 'bq.svg', e8: 'bk.svg', f8: 'bb.svg', g8: 'bn.svg', h8: 'br.svg',
  a7: 'bp.svg', b7: 'bp.svg', c7: 'bp.svg', d7: 'bp.svg', e7: 'bp.svg', f7: 'bp.svg', g7: 'bp.svg', h7: 'bp.svg'
};

function placeInitialPieces() {
  files.forEach(f=> {
    ranks.forEach(r=> {
      const id = f + r;
      const el = document.getElementById(id);
      if (el) el.innerHTML = '';
    });
  });
  // insert images from pieces folder
  for (const sq in initialPlacement) {
    const fname = initialPlacement[sq];
    const img = document.createElement('img');
    img.className = 'piece';
    img.alt = fname.replace('.svg','');
    img.src = 'wikipedia-pieces/' + fname;
    // add onerror handler to show missing files
    img.onerror = ()=>{ img.style.opacity = '0.25'; img.alt = 'missing: ' + fname; img.title = 'Missing file: ' + fname; };
    const container = document.getElementById(sq);
    if (container)
        container.appendChild(img);
  }
}

buildGrid();
placeInitialPieces();
