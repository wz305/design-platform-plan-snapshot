# Decl spec-0.1all (Readable)

## 概览
- schema: `spec/0.1`
- type: `ad.decl`
- format: `spec-0.1all`
- declId: `decl-h:37566a5b`
- declHash: `h:37566a5b`
- rowIdMode: `implicit-1`
- tableCount: `37`
- stringBankCount: `14`
- source: `D:\!Work\设计平台计划\AD21_JS_Project\reports\decl-2025-12-30_21-03-00-127.json`

## Tables

### [1] track (objectId=4)

| idx | field | fieldType |
| --- | --- | --- |
| 1 | x1 | n |
| 2 | y1 | n |
| 3 | x2 | n |
| 4 | y2 | n |
| 5 | width | n |
| 6 | layerId | layerId |
| 7 | netId | netId |

### [2] arc (objectId=1)

| idx | field | fieldType |
| --- | --- | --- |
| 1 | centerX | n |
| 2 | centerY | n |
| 3 | radius | n |
| 4 | startAngle | n |
| 5 | endAngle | n |
| 6 | startX | n |
| 7 | startY | n |
| 8 | endX | n |
| 9 | endY | n |
| 10 | lineWidth | n |
| 11 | layerId | layerId |
| 12 | netId | netId |

### [3] via (objectId=3)

| idx | field | fieldType |
| --- | --- | --- |
| 1 | x | n |
| 2 | y | n |
| 3 | lowLayerId | layerId |
| 4 | highLayerId | layerId |
| 5 | holeSize | n |
| 6 | netId | netId |

### [4] via.layer (objectId=3)

| idx | field | fieldType |
| --- | --- | --- |
| 1 | viaId | ref |
| 2 | layerId | layerId |
| 3 | shape | e |
| 4 | size | n |

### [5] pad (objectId=2)

| idx | field | fieldType |
| --- | --- | --- |
| 1 | x | n |
| 2 | y | n |
| 3 | rotation | n |
| 4 | mode | e |
| 5 | plated | b |
| 6 | holeSize | n |
| 7 | drillType | e |
| 8 | holeType | e |
| 9 | holeWidth | n |
| 10 | holeRotation | n |
| 11 | netId | netId |
| 12 | ownerPartId | n |
| 13 | nameId | s |

### [6] pad.layer (objectId=2)

| idx | field | fieldType |
| --- | --- | --- |
| 1 | padId | ref |
| 2 | layerId | layerId |
| 3 | shape | e |
| 4 | xSize | n |
| 5 | ySize | n |
| 6 | offsetX | n |
| 7 | offsetY | n |
| 8 | cornerRadiusPct | n |

### [7] polygon (objectId=10)

| idx | field | fieldType |
| --- | --- | --- |
| 1 | layerId | layerId |
| 2 | netId | netId |
| 3 | polygonType | e |
| 4 | pourOver | e |
| 5 | grid | n |
| 6 | trackSize | n |
| 7 | minTrack | n |
| 8 | borderWidth | n |
| 9 | removeDead | b |
| 10 | removeIslandsByArea | b |
| 11 | islandAreaThreshold | n |
| 12 | removeNarrowNecks | b |
| 13 | neckWidthThreshold | n |
| 14 | arcApprox | n |

### [8] polygon.seg.track (objectId=10)

| idx | field | fieldType |
| --- | --- | --- |
| 1 | polyId | ref |
| 2 | x1 | n |
| 3 | y1 | n |
| 4 | x2 | n |
| 5 | y2 | n |
| 6 | width | n |

### [9] polygon.seg.arc (objectId=10)

| idx | field | fieldType |
| --- | --- | --- |
| 1 | polyId | ref |
| 2 | centerX | n |
| 3 | centerY | n |
| 4 | radius | n |
| 5 | startAngle | n |
| 6 | endAngle | n |
| 7 | startX | n |
| 8 | startY | n |
| 9 | endX | n |
| 10 | endY | n |
| 11 | lineWidth | n |

### [10] board.outline (objectId=26)

| idx | field | fieldType |
| --- | --- | --- |
| 1 | outlineId | ref |

### [11] board.outline.seg.track (objectId=26)

| idx | field | fieldType |
| --- | --- | --- |
| 1 | outlineId | ref |
| 2 | x1 | n |
| 3 | y1 | n |
| 4 | x2 | n |
| 5 | y2 | n |
| 6 | width | n |

### [12] board.outline.seg.arc (objectId=26)

| idx | field | fieldType |
| --- | --- | --- |
| 1 | outlineId | ref |
| 2 | centerX | n |
| 3 | centerY | n |
| 4 | radius | n |
| 5 | startAngle | n |
| 6 | endAngle | n |
| 7 | startX | n |
| 8 | startY | n |
| 9 | endX | n |
| 10 | endY | n |
| 11 | lineWidth | n |

### [13] fill (objectId=6)

| idx | field | fieldType |
| --- | --- | --- |
| 1 | x1 | n |
| 2 | y1 | n |
| 3 | x2 | n |
| 4 | y2 | n |
| 5 | rotation | n |
| 6 | layerId | layerId |
| 7 | netId | netId |

### [14] region (objectId=11)

| idx | field | fieldType |
| --- | --- | --- |
| 1 | layerId | layerId |
| 2 | netId | netId |

### [15] region.seg.track (objectId=11)

| idx | field | fieldType |
| --- | --- | --- |
| 1 | regionId | ref |
| 2 | x1 | n |
| 3 | y1 | n |
| 4 | x2 | n |
| 5 | y2 | n |
| 6 | width | n |

### [16] region.seg.arc (objectId=11)

| idx | field | fieldType |
| --- | --- | --- |
| 1 | regionId | ref |
| 2 | centerX | n |
| 3 | centerY | n |
| 4 | radius | n |
| 5 | startAngle | n |
| 6 | endAngle | n |
| 7 | startX | n |
| 8 | startY | n |
| 9 | endX | n |
| 10 | endY | n |
| 11 | lineWidth | n |

### [17] splitplane (objectId=22)

| idx | field | fieldType |
| --- | --- | --- |
| 1 | layerId | layerId |
| 2 | netId | netId |

### [18] splitplane.seg.track (objectId=22)

| idx | field | fieldType |
| --- | --- | --- |
| 1 | planeId | ref |
| 2 | x1 | n |
| 3 | y1 | n |
| 4 | x2 | n |
| 5 | y2 | n |
| 6 | width | n |

### [19] splitplane.seg.arc (objectId=22)

| idx | field | fieldType |
| --- | --- | --- |
| 1 | planeId | ref |
| 2 | centerX | n |
| 3 | centerY | n |
| 4 | radius | n |
| 5 | startAngle | n |
| 6 | endAngle | n |
| 7 | startX | n |
| 8 | startY | n |
| 9 | endX | n |
| 10 | endY | n |
| 11 | lineWidth | n |

### [20] text (objectId=5)

| idx | field | fieldType |
| --- | --- | --- |
| 1 | x | n |
| 2 | y | n |
| 3 | layerId | layerId |
| 4 | rotation | n |
| 5 | height | n |
| 6 | width | n |
| 7 | strokeWidth | n |
| 8 | textId | s |
| 9 | fontId | s |
| 10 | inverted | b |
| 11 | mirrored | b |

### [21] component (objectId=9)

| idx | field | fieldType |
| --- | --- | --- |
| 1 | x | n |
| 2 | y | n |
| 3 | layerId | layerId |
| 4 | rotation | n |
| 5 | designatorId | s |
| 6 | commentId | s |
| 7 | patternId | s |
| 8 | sourceLibId | s |
| 9 | locked | b |

### [22] component.body (objectId=12)

| idx | field | fieldType |
| --- | --- | --- |
| 1 | componentId | ref |
| 2 | layerId | layerId |
| 3 | x1 | n |
| 4 | y1 | n |
| 5 | x2 | n |
| 6 | y2 | n |
| 7 | bodyType | e |

### [23] net (objectId=8)

| idx | field | fieldType |
| --- | --- | --- |
| 1 | nameId | s |

### [24] class (objectId=15)

| idx | field | fieldType |
| --- | --- | --- |
| 1 | classKind | e |
| 2 | nameId | s |

### [25] rule (objectId=16)

| idx | field | fieldType |
| --- | --- | --- |
| 1 | ruleKind | e |
| 2 | nameId | s |
| 3 | enabled | b |

### [26] diffpair (objectId=18)

| idx | field | fieldType |
| --- | --- | --- |
| 1 | nameId | s |
| 2 | netPId | ref |
| 3 | netNId | ref |

### [27] fromto (objectId=17)

| idx | field | fieldType |
| --- | --- | --- |
| 1 | netId | ref |
| 2 | fromPadId | ref |
| 3 | toPadId | ref |

### [28] coordinate (objectId=14)

| idx | field | fieldType |
| --- | --- | --- |
| 1 | x | n |
| 2 | y | n |
| 3 | layerId | layerId |

### [29] dimension (objectId=13)

| idx | field | fieldType |
| --- | --- | --- |
| 1 | dimType | e |
| 2 | x1 | n |
| 3 | y1 | n |
| 4 | x2 | n |
| 5 | y2 | n |
| 6 | textId | s |

### [30] violation (objectId=19)

| idx | field | fieldType |
| --- | --- | --- |
| 1 | ruleId | ref |
| 2 | objAId | ref |
| 3 | objBId | ref |
| 4 | x | n |
| 5 | y | n |

### [31] connection (objectId=7)

| idx | field | fieldType |
| --- | --- | --- |
| 1 | x1 | n |
| 2 | y1 | n |
| 3 | x2 | n |
| 4 | y2 | n |
| 5 | layerId | layerId |
| 6 | netId | netId |

### [32] embedded (objectId=20)

| idx | field | fieldType |
| --- | --- | --- |
| 1 | nameId | s |
| 2 | x | n |
| 3 | y | n |
| 4 | rotation | n |
| 5 | scaleX | n |
| 6 | scaleY | n |

### [33] embedded.board (objectId=21)

| idx | field | fieldType |
| --- | --- | --- |
| 1 | nameId | s |
| 2 | x | n |
| 3 | y | n |
| 4 | rotation | n |
| 5 | scaleX | n |
| 6 | scaleY | n |

### [34] board (objectId=25)

| idx | field | fieldType |
| --- | --- | --- |
| 1 | nameId | s |
| 2 | originX | n |
| 3 | originY | n |

### [35] trace (objectId=23)

| idx | field | fieldType |
| --- | --- | --- |
| 1 | x1 | n |
| 2 | y1 | n |
| 3 | x2 | n |
| 4 | y2 | n |
| 5 | width | n |
| 6 | layerId | layerId |
| 7 | netId | netId |

### [36] sparevia (objectId=24)

| idx | field | fieldType |
| --- | --- | --- |
| 1 | x | n |
| 2 | y | n |
| 3 | lowLayerId | layerId |
| 4 | highLayerId | layerId |
| 5 | holeSize | n |
| 6 | netId | netId |

### [37] prop (objectId=null)

| idx | field | fieldType |
| --- | --- | --- |
| 1 | objectId | e |
| 2 | rowId | ref |
| 3 | propId | s |
| 4 | valueType | e |
| 5 | valueNum | n |
| 6 | valueStrId | s |
| 7 | layerId | layerId |

## String Banks
| idx | bankId | objectId | note |
| --- | --- | --- | --- |
| 1 | layer | null | layer names |
| 2 | 8 | 8 | net strings |
| 3 | 5 | 5 | text strings |
| 4 | 13 | 13 | dimension strings |
| 5 | 9 | 9 | component strings |
| 6 | 2 | 2 | pad strings |
| 7 | 15 | 15 | class strings |
| 8 | 16 | 16 | rule strings |
| 9 | 18 | 18 | diffpair strings |
| 10 | 20 | 20 | embedded strings |
| 11 | 21 | 21 | embedded board strings |
| 12 | 25 | 25 | board strings |
| 13 | prop.name | null | property names |
| 14 | prop.value | null | property values |
