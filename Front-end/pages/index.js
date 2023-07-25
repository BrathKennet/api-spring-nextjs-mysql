import { Inter } from 'next/font/google'
import { useState } from 'react';
import { hasAccessToken } from '@/utilities/utility';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Logout from '@/components/Logout';
import { useAuth } from '@/utilities/auth';
import ListTeachers from '@/components/ListTeachers';
import Link from 'next/link';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  useAuth();

  return (
    <div className='flex flex-col items-center w-screen h-full bg-gradient-to-b from-emerald-400 to-emerald-600'>
      <div className=' flex flex-wrap m-1 fixed '>
        <Logout />
        <Link
          className=" text-xl bg-indigo-700 text-white rounded-md my-3 mx-3 py-3 px-7 hover:bg-slate-300 hover:text-black duration-500"
          href={"/addteacher"}
        >
          Agregar Docente
        </Link>
      </div>
      <div className='mt-20 mb-5 overflow-y-scroll h-[85vh]'>
        <ListTeachers />
      </div>
      <br />
    </div>
  );
}
