import { Pagination } from 'react-bootstrap';

interface PaginatorProps {
  className?: string;
  currentPage: number;
  maxPage: number;
  onClick: (page: number) => void;
}

export const Paginator = ({
  className,
  currentPage,
  maxPage,
  onClick,
}: PaginatorProps) => {
  return (
    <Pagination className={className}>
      <Pagination.First
        disabled={currentPage === 1}
        onClick={() => onClick(1)}
      />
      <Pagination.Prev
        disabled={currentPage === 1}
        onClick={() => onClick(currentPage - 1)}
      />
      {Array.from({ length: maxPage }).map((_, index) => (
        <Pagination.Item
          active={index + 1 === currentPage}
          onClick={() => onClick(index + 1)}
          key={index + 1}
        >
          {index + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next
        disabled={currentPage === maxPage}
        onClick={() => onClick(currentPage + 1)}
      />
      <Pagination.Last
        disabled={currentPage === maxPage}
        onClick={() => onClick(maxPage)}
      />
    </Pagination>
  );
};
