import { useRouter } from 'next/router';
import Scan from '../scan';

const Scanevent = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <Scan></Scan>
    </div>
  );
};

export default Scanevent;