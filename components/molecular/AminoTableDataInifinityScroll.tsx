import { VFC, useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { SourceTableDataT } from 'types/SourceTableData';
import InfiniteScroll from "react-infinite-scroll-component";
import OneTable from 'components/atom/OneTable';
import OneTableSkeleton from 'components/atom/OneTableSkeleton';

const AminoTableDataInifinityScroll: VFC<{tableData: SourceTableDataT[], setColumnKeys: string[]}> = ({tableData, setColumnKeys}) => {
  const [list, setList] = useState(tableData.slice(0,4));
  const [isHasMore, setIsHasMore] = useState(true);
  const fetchMoreData = () => {
    if(list.length === tableData.length) return setIsHasMore(false);
    setTimeout(() => {setList([...list, ...tableData.slice(list.length, list.length + 4)])},200)
  };

  const loader = <OneTableSkeleton oneFoodData={list[0]} setColumnKeys={setColumnKeys} index={9999}/>;

  useEffect(() => {
    // useRefを使ってscrollTo(0,0)を実現したかったがスクロール量を取得できるInfinaiteScrollコンポーネントにref属性を付与することができなかったためdocument.getElementsByClassNameを使用
    document.getElementsByClassName('infinite-scroll-component')[0].scrollTo(0,0);
    if(isHasMore === false) setIsHasMore(true);
    setList(tableData.slice(0,4));
  },[tableData, tableData[0], tableData[1]]) // Table Order of listsを変更した場合はtableData数は変更しないためuseEffectが作動しない。そのためのtableData[0], tableData[1]

  return (
  <Box overflowY="scroll">
    <Box id="ScrollToZero">
    <InfiniteScroll
      dataLength={list.length}
      next={fetchMoreData}
      hasMore={isHasMore}
      loader={loader}
      height={550}
      initialScrollY={100}
      scrollableTarget="ScrollToZero"
    >
      {list.map((oneFoodData, index) => <OneTable key={`${oneFoodData.ItemNo}-${index}`} oneFoodData={oneFoodData} setColumnKeys={setColumnKeys} index={index} />)}
    </InfiniteScroll>
    </Box>
  </Box>
  );
}

export default AminoTableDataInifinityScroll;