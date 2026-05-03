// 'use client';

// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import * as z from 'zod';
// import { signIn } from 'next-auth/react';
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useToast } from '@/components/ui/use-toast';
// import { signInSchema } from '@/schemas/signInSchema';

// export default function SignInForm() {
//   const router = useRouter();

//   const form = useForm<z.infer<typeof signInSchema>>({
//     resolver: zodResolver(signInSchema),
//     defaultValues: {
//       identifier: '',
//       password: '',
//     },
//   });

//   const { toast } = useToast();
//   const onSubmit = async (data: z.infer<typeof signInSchema>) => {
//     const result = await signIn('credentials', {
//       redirect: false,
//       identifier: data.identifier,
//       password: data.password,
//     });

//     if (result?.error) {
//       if (result.error === 'CredentialsSignin') {
//         toast({
//           title: 'Login Failed',
//           description: 'Incorrect username or password',
//           variant: 'destructive',
//         });
//       } else {
//         toast({
//           title: 'Error',
//           description: result.error,
//           variant: 'destructive',
//         });
//       }
//     }

//     if (result?.url) {
//       router.replace('/dashboard');
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-800">
//       <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
//         <div className="text-center">
//           <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
//             Welcome Back to True Feedback
//           </h1>
//           <p className="mb-4">Sign in to continue your secret conversations</p>
//         </div>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <FormField
//               name="identifier"
//               control={form.control}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email/Username</FormLabel>
//                   <Input {...field} />
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               name="password"
//               control={form.control}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Password</FormLabel>
//                   <Input type="password" {...field} />
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button className='w-full' type="submit">Sign In</Button>
//           </form>
//         </Form>
//         <div className="text-center mt-4">
//           <p>
//             Not a member yet?{' '}
//             <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
//               Sign up
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { signInSchema } from '@/schemas/signInSchema';

export default function SignInForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const { toast } = useToast();
  
  // const onSubmit = async (data: z.infer<typeof signInSchema>) => {
  //   setIsLoading(true);
    
  //   try {
  //     const result = await signIn('credentials', {
  //       redirect: false,
  //       identifier: data.identifier,
  //       password: data.password,
  //     });

  //     if (result?.error) {
  //       if (result.error === 'CredentialsSignin') {
  //         toast({
  //           title: 'Login Failed',
  //           description: 'Incorrect username or password',
  //           variant: 'destructive',
  //         });
  //       } else {
  //         toast({
  //           title: 'Error',
  //           description: result.error,
  //           variant: 'destructive',
  //         });
  //       }
  //     }

  //     if (result?.url) {
  //       router.replace('/dashboard');
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
  setIsLoading(true);
  
  try {
    const result = await signIn('credentials', {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    if (result?.error) {
      if (result.error === 'CredentialsSignin') {
        toast({
          title: 'Login Failed',
          description: 'Incorrect username or password',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        });
      }
    } else {
      // Show success message
      toast({
        title: 'Success',
        description: 'Signed in successfully!',
      });
      
      // Force redirect after a small delay
      setTimeout(() => {
        router.replace('/dashboard');
      }, 100);
    }
  } catch (error) {
    toast({
      title: 'Error',
      description: 'An unexpected error occurred',
      variant: 'destructive',
    });
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-50 p-4">
      <div className="w-full max-w-md px-4 sm:px-8 py-6 sm:py-8 space-y-5 sm:space-y-6 bg-white rounded-2xl shadow-xl border border-stone-200/50">
        <div className="text-center space-y-1.5 sm:space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3 sm:mb-4">
            Welcome Back to Anonyms Message
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm">Sign in to continue your secret conversations</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs sm:text-sm">Email/Username</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs sm:text-sm">Password</FormLabel>
                  <Input type="password" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='w-full text-xs sm:text-sm py-2 sm:py-2.5' type="submit">
              Sign In
            </Button>
          </form>
        </Form>
        
        <div className="relative my-3 sm:my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-stone-200"></div>
          </div>
          <div className="relative flex justify-center text-xs sm:text-sm">
            <span className="px-2 bg-white text-stone-500">or continue with</span>
          </div>
        </div>
        
        <button
          type="button"
          onClick={() => {
            setIsGoogleLoading(true);
            signIn('google', { callbackUrl: '/dashboard' });
          }}
          disabled={isGoogleLoading}
          className="w-full flex items-center justify-center gap-2 sm:gap-3 px-4 py-2 sm:py-2.5 rounded-md border border-stone-200 bg-white text-stone-700 text-xs sm:text-sm font-medium transition-all duration-200 hover:bg-stone-50 hover:border-stone-300 hover:shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isGoogleLoading ? (
            <>
              <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-smooth-spin" />
              <span className="hidden sm:inline">Connecting...</span>
              <span className="sm:hidden">Loading...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC04" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="hidden sm:inline">Continue with Google</span>
              <span className="sm:hidden">Google</span>
            </>
          )}
        </button>
        
        <div className="text-center mt-3 sm:mt-4">
          <p className="text-xs sm:text-sm">
            Not a member yet?{' '}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}