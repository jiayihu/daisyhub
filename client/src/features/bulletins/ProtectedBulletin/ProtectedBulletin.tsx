import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { checkIsBulletinHost } from '../../../services/bulletin-history.service';
import { BulletinHost } from '../BulletinHost/BulletinHost';
import { BulletinVisitor } from '../BulletinVisitor/BulletinVisitor';

export const ProtectedBulletin = () => {
  const match = useRouteMatch<{ bulletinId: string }>();
  const bulletinId = match.params.bulletinId;
  const [checked, setChecked] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    checkIsBulletinHost(bulletinId).then(isOwner => {
      setIsOwner(isOwner);
      setChecked(true);
    });
  }, [bulletinId]);

  if (!checked) return null;

  return isOwner ? <BulletinHost /> : <BulletinVisitor />;
};
