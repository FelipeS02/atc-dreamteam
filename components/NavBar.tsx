import Image from 'next/image';
import Logo from '@/public/assets/icons/logo.svg';

const NavBar = () => {
  return (
    <nav className='flex justify-between align-middle my-8'>
      <h2 className='text-3xl text-white font-koho font-semibold'>Bienvenido</h2>{' '}
      <Image src={Logo} alt='logo' rel='icon' className='h-12' />
    </nav>
  );
};

export default NavBar;
