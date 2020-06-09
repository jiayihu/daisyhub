import './Bulletins.scss';
import React, { useEffect, useState } from 'react';
import { getBulletins } from '../../../store/actions/bulletin.actions';
import { History } from 'history';
import { CardColumns, Alert } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { selectBulletins } from '../../../store/reducers';
import { BulletinPreview } from '../BulletinPreview/BulletinPreview';
import { Link } from 'react-router-dom';
import { PostLoader } from '../../ui/PostLoader/PostLoader';
import { Filters } from './Filters/Filters';

type Props = {
  history: History;
};

export const Bulletins = (_: Props) => {
  const bulletins = useSelector(selectBulletins);
  const [filters, setFilters] = useState<{
    minPrice: number;
    maxPrice: number;
    fees: boolean | null;
  }>({
    minPrice: 0,
    maxPrice: 1000,
    fees: null,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBulletins());
  }, [dispatch]);

  if (!bulletins) return <PostLoader />;
  if (!bulletins.length)
    return (
      <>
        <Alert color="light">
          <h3>Whoopsie, pretty empty here!</h3>
          There are currently no islands. <Link to="/host">Be the first to sell turnips!</Link>
        </Alert>
      </>
    );

  const filteredBulletins = bulletins.filter(
    bulletin =>
      bulletin.turnipPrice >= filters.minPrice &&
      bulletin.turnipPrice <= filters.maxPrice &&
      (filters.fees !== null ? bulletin.preferences.hasFee === filters.fees : true),
  );

  const orderedBulletins = [...filteredBulletins].sort((a, b) =>
    new Date(a.meta.creationDate) < new Date(b.meta.creationDate) ? 1 : -1,
  );

  if (!orderedBulletins.length)
    return (
      <>
        <Filters handleSetFilters={setFilters} />
        <Alert color="light">
          <h3>Whoopsie, no islands meet these criteria!</h3>
          Try change your filter settings.
        </Alert>
      </>
    );

  return (
    <>
      <Filters handleSetFilters={setFilters} />
      <CardColumns className="bulletins">
        {orderedBulletins.map(bulletin => (
          <BulletinPreview bulletin={bulletin} key={bulletin.id} />
        ))}
      </CardColumns>
    </>
  );
};
