import Link from 'next/link';

import { paths } from '@/config/paths';

const NotFoundPage = () => {
  return (
    <div>
      <h1>404 - Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link href={paths.home.getHref()} replace>
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
