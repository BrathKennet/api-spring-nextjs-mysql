import AddFormTeacher from '@/components/AddFormTeacher'
import React from 'react'
import { useAuth } from '@/utilities/auth';
import Link from 'next/link';

const AddTeacher = () => {
  useAuth();

  return (
    <div className='flex flex-col h-screen bg-gradient-to-b from-violet-400 to-blue-400'>
       <Link href={"/"} className="w-min bg-red-500 text-white p-3 m-2 rounded-md">
        Regresar
      </Link>
      <AddFormTeacher />
    </div>
  );
}

export default AddTeacher