import './index.css';
import { router } from './js/router.js';

// Initialize the vanilla Router lifecycle
router.init();

// First-time manual routing context trigger
document.addEventListener('DOMContentLoaded', () => {
  router.resolve();
});
