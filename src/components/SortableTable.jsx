import React, { useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

const stylesTAGS = {
    'action':           { background: '#fee2e2', color: '#991b1b' },
    'actionrpg':        { background: '#fee2e2', color: '#991b1b' },
    'fps':              { background: '#dbeafe', color: '#1e40af' },
    'tps':              { background: '#dbeafe', color: '#1e40af' },
    'rpg':              { background: '#ede9fe', color: '#5b21b6' },
    'aventure':         { background: '#d1fae5', color: '#065f46' },
    'actionadventure':  { background: '#d1fae5', color: '#065f46' },
    'survivalhorror':   { background: '#d1fae5', color: '#065f46' },
    'simulation':       { background: '#d1fae5', color: '#065f46' },
    'platformer':       { background: '#d1fae5', color: '#065f46' },
    'fighting':         { background: '#d1fae5', color: '#065f46' },
    'education':        { background: '#d1fae5', color: '#065f46' },
    'tsshooter':        { background: '#d1fae5', color: '#065f46' },
    'trpg':             { background: '#d1fae5', color: '#065f46' },
    'aiming':           { background: '#fee2e2', color: '#991b1b' },
    'freecamera':       { background: '#dbeafe', color: '#1e40af' },
    'other':            { background: '#dbeafe', color: '#1e40af' },
    'shortcuts':        { background: '#dbeafe', color: '#1e40af' },
    'lefthanded':       { background: '#ede9fe', color: '#5b21b6' },
    'aerialcombat':     { background: '#ede9fe', color: '#5b21b6' },
    'railshooter':      { background: '#ede9fe', color: '#5b21b6' },
    'sandbox':          { background: '#ede9fe', color: '#5b21b6' },
    'jrpg':             { background: '#ede9fe', color: '#5b21b6' },
    'roguelike':        { background: '#ede9fe', color: '#5b21b6' },
    'muso':             { background: '#ede9fe', color: '#5b21b6' },
    'survival':         { background: '#ede9fe', color: '#5b21b6' },
    'openworld':        { background: '#ede9fe', color: '#5b21b6' },
    'sports':           { background: '#ede9fe', color: '#5b21b6' },
    'btu':              { background: '#ede9fe', color: '#5b21b6' },
    'metroidvania':     { background: '#ede9fe', color: '#5b21b6' },
    'puzzle':           { background: '#ede9fe', color: '#5b21b6' },
};

const styles = {
    noTD:       {textDecoration:'none'},
    wrap:       { overflowX: 'auto', margin: '1.5rem 0' },
    noWrap:     { whiteSpace: 'nowrap' },
    table:      { width: '100%', borderCollapse: 'collapse', fontSize: '16px' },
    th:         { textAlign: 'left', padding: '12px 10px', fontSize: '16px', fontWeight: 600,
                  textTransform: 'uppercase', letterSpacing: '0.06em',
                  borderBottom: '1.5px solid var(--ifm-color-emphasis-300)',
                  background: 'var(--ifm-color-emphasis-100)',
                  color: 'var(--ifm-color-emphasis-600)', userSelect: 'none', whiteSpace: 'nowrap' },
    thSortable: { cursor: 'pointer' },
    thStatic:   { cursor: 'default' },
    td:         { padding: '8px 6px', borderBottom: '0.5px solid var(--ifm-color-emphasis-200)', verticalAlign: 'middle', textAlign: 'center' },
    tdCompact:  { padding: '4px 4px' },
    tag:        { borderRadius: '4px', padding: '2px 8px', fontSize: '11px', fontWeight: 600 },
    tagGroup:   { display: 'inline-flex', flexWrap: 'wrap', gap: '4px', justifyContent: 'center' },
    image:      { width: '110px', maxWidth: '110px', objectFit: 'contain', display: 'inline-block', verticalAlign: 'middle' },
    ytWrap:     { position: 'relative', width: '160px', overflow: 'hidden', cursor: 'pointer',display: 'flex', justifyContent: 'center', alignItems: 'center'},
    ytImg:      { width: '160px', aspectRatio: '16 / 9', objectFit: 'cover', display: 'block' },
    ytBtn:      { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
                  width: '40px', height: '40px', background: 'rgba(0,0,0,0.7)', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center' },
    ytArrow:    { borderLeft: '14px solid white', borderTop: '9px solid transparent', borderBottom: '9px solid transparent', marginLeft: '3px' },
};

const isUnsortable = (value) => value?.type === 'youtube' || value?.type === 'image';

const isNoPadding = (value) => value?.type === 'youtube' || value?.type === 'image' || value?.type === 'text';

const isNoWrap = (value) => value?.type === 'tag';

const getSortValue = (val) => {
    if (val?.type === 'tag') {
        const values = Array.isArray(val.value) ? val.value : [val.value];
        return values.join('').toLowerCase();
    }
    if (val?.type === 'badge') return String(val.value);
    return String(val ?? '').toLowerCase();
};


function renderCell(value, labels) {
    if (value === null || value === undefined) return '—';
  
    // image
    if (value?.type === 'image') {
        const imgUrl = useBaseUrl(value.src);
        return (
            <a href={imgUrl} target="_blank" rel="noreferrer">
                <img src={imgUrl} alt={value.alt} style={styles.image} />
            </a>
        );
    }
    
    //tag
    if (value?.type === 'tag') {
        const values = Array.isArray(value.value) ? value.value : [value.value];
        return (
            <span style={styles.tagGroup}>
                {values.map((v) => (
                    <span key={v} style={{...styles.tag, ...stylesTAGS[v]}}>
                        {labels?.[v] ?? v}
                    </span>
                ))}
            </span>
        );
    }

    // youtube
    if (value?.type === 'youtube') return (
        <a href={`https://youtube.com/watch?v=${value.id}`} target="_blank" rel="noreferrer" style={styles.noTD}>
            <div style={styles.ytWrap}>
                <img src={`https://img.youtube.com/vi/${value.id}/mqdefault.jpg`} alt={value.id} style={styles.ytImg} />
                    <div style={styles.ytBtn}>
                    <div style={styles.ytArrow} />
                    </div>
            </div>
        </a>
    );

    //others and non specified
    if (value?.type === 'text') {
        return value.value;
    }
    return value;
}

export default function SortableTable({ columns, data, labels, defaultSort = 'name', secondarySort = 'name'  }) {
    const [sortCol, setSortCol] = useState(defaultSort);
    const [sortAsc, setSortAsc] = useState(true);

    const sorted = [...data].sort((a, b) => {
        const ta = getSortValue(a[sortCol]);
        const tb = getSortValue(b[sortCol]);
        const result = sortAsc ? ta.localeCompare(tb) : tb.localeCompare(ta);
        if (result === 0 && sortCol !== secondarySort) {
            return getSortValue(a[secondarySort]).localeCompare(getSortValue(b[secondarySort]));
        }
        return result;
    });

    const handleSort = (key) => {
        if (isUnsortable(data[0]?.[key])) return;
        if (sortCol === key) setSortAsc(v => !v);
        else { setSortCol(key); setSortAsc(true); }
    };

    return (
        <div style={styles.wrap}>
            <table style={styles.table}>
                <thead>
                    <tr>
                    {columns.map(col => (
                        <th
                            key={col.key} onClick={() => handleSort(col.key)}
                            style={{
                                ...styles.th,
                                ...(isUnsortable(data[0]?.[col.key]) ? styles.thStatic : styles.thSortable),
                                ...(col.minWidth ? { minWidth: col.minWidth } : {})
                            }}
                        >
                        {col.label}
                        {!isUnsortable(data[0]?.[col.key]) && (
                            <span style={{opacity: sortCol === col.key ? 1 : 0.35}}>
                                {sortCol === col.key ? (sortAsc ? ' ↑' : ' ↓') : ' ↕'}
                            </span>
                        )}
                        </th>
                    ))}
                    </tr>
                </thead>
                <tbody>
                    {sorted.map((row, i) => (
                        <tr key={i}>
                            {columns.map(col => (
                                <td key={col.key} style={{
                                ...styles.td,
                                ...(isNoPadding(row[col.key]) ? styles.tdCompact : {}),
                                ...(isNoWrap(row[col.key]) ? styles.noWrap : {})
                                }}>
                                {renderCell(row[col.key], labels)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
