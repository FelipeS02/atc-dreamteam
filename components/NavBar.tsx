import Image from 'next/image';
import Logo from '@/public/assets/icons/logo.svg';

const NavBar = () => {
  return (
    <nav className='flex justify-between align-middle my-4'>
      <h2 className='text-3xl font-koho font-semibold'>Bienvenido</h2>{' '}
      <Image src={Logo} alt='logo' rel='icon' />
    </nav>
  );
};

export default NavBar;
