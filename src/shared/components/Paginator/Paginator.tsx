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
      {currentPage >= 3 && (
        <Pagination.Item onClick={() => onClick(currentPage - 2)}>
          {currentPage - 2}
        </Pagination.Item>
      )}
      {currentPage >= 2 && (
        <Pagination.Item onClick={() => onClick(currentPage - 1)}>
          {currentPage - 1}
        </Pagination.Item>
      )}

      <Pagination.Item active onClick={() => onClick(currentPage)}>
        {currentPage}
      </Pagination.Item>

      {currentPage <= maxPage - 1 && (
        <Pagination.Item onClick={() => onClick(currentPage + 1)}>
          {currentPage + 1}
        </Pagination.Item>
      )}
      {currentPage <= maxPage - 2 && (
        <Pagination.Item onClick={() => onClick(currentPage + 2)}>
          {currentPage + 2}
        </Pagination.Item>
      )}
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
