/**
 * Allows a local server without deploying functions to the cloud to test
 */

import { app } from './index';

app.listen(3001, () => {
  console.log('Server is running at http://localhost:3001');
});
