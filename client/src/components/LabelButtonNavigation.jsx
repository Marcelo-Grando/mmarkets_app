import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import { useState } from 'react';

export default function LabelBottomNavigation() {
  const [value, setValue] = useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation sx={{ width: 1000 }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="Recents"
        value="recents"
      />
      <BottomNavigationAction
        label="Favorites"
        value="favorites"
      />
      <BottomNavigationAction
        label="Nearby"
        value="nearby"
      />
      <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon />} />
    </BottomNavigation>
  );
}
