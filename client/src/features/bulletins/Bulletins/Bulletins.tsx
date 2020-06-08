import './Bulletins.scss';
import React, { useEffect, useState, useCallback } from 'react';
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

export enum hasFees {
  YES = 'yes',
  NO = '',
  ANY = 'any',
}

export const Bulletins = (_: Props) => {
  const bulletins = useSelector(selectBulletins);
  const [filteredBulletins, setFilteredBulletins] = useState(bulletins);

  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 1000,
    fees: hasFees.ANY,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBulletins());
  }, [dispatch]);

  const handleSetFilters = useCallback((minPrice: number, maxPrice: number, fees: hasFees) => {
    setFilters({ minPrice, maxPrice, fees });
  }, []);

  useEffect(() => {
    if (bulletins && filters) {
      switch (filters.fees) {
        case hasFees.ANY:
          setFilteredBulletins(
            bulletins.filter(bulletin => {
              return (
                bulletin.turnipPrice >= filters.minPrice && bulletin.turnipPrice <= filters.maxPrice
              );
            }),
          );
          break;
        case hasFees.NO:
          setFilteredBulletins(
            bulletins.filter(bulletin => {
              return (
                bulletin.turnipPrice >= filters.minPrice &&
                bulletin.turnipPrice <= filters.maxPrice &&
                !bulletin.preferences.hasFee
              );
            }),
          );
          break;
        case hasFees.YES:
          setFilteredBulletins(
            bulletins.filter(bulletin => {
              return (
                bulletin.turnipPrice > filters.minPrice &&
                bulletin.turnipPrice < filters.maxPrice &&
                bulletin.preferences.hasFee
              );
            }),
          );
          break;
        default:
          setFilteredBulletins(bulletins);
      }
    }
  }, [filters, bulletins]);

  if (!filteredBulletins) return <PostLoader />;
  if (!filteredBulletins.length)
    return (
      <>
        <Filters handleSetFilters={handleSetFilters} />
        <Alert color="light">
          <h3>Whoopsie, pretty empty here!</h3>
          There are currently no islands. <Link to="/host">Be the first to sell turnips!</Link>
        </Alert>
      </>
    );

  const orderedBulletins = [...filteredBulletins].sort((a, b) =>
    new Date(a.meta.creationDate) < new Date(b.meta.creationDate) ? 1 : -1,
  );

  return (
    <>
      <Filters handleSetFilters={handleSetFilters} />
      <CardColumns className="bulletins">
        {orderedBulletins.map(bulletin => (
          <BulletinPreview bulletin={bulletin} key={bulletin.id} />
        ))}
      </CardColumns>
    </>
  );
};
