import { useMutation } from '@tanstack/react-query';

import { useRouter } from 'next/navigation';

import api from '../../api';
import routes from '@/lib/routes';
import { GenericResponse } from '@/services/generalTypes';
import { errorToast, handleErrors, successToast } from '@/services/helper';

export const useVerifyBuyerEmail = () => {
  const navigate = useRouter();
  const { mutate, isPending, isError, ...rest } = useMutation({
    mutationFn: async ({ url, data }: any) => {
      return await api.post({ url, body: { ...data }, auth: false });
    },
    onSuccess: (_, variables) => {
      navigate.push(
        `${routes.auth.register.path}?active=emailSent&email=${variables.data?.email}`,
      );
    },
    onError: () => {},
  });
  return {
    mutate,
    isPending,
    isError,
    rest,
  };
};

export const useResendResetEmail = () => {
  const { mutate, isPending, isError, ...rest } = useMutation({
    mutationFn: async ({
      url,
      data,
    }: {
      url: string;
      data: any;
    }): Promise<any> => {
      return await api.post({ url, body: { ...data }, auth: false });
    },
    onSuccess: (res: GenericResponse) => {
      console.log({ res });
      successToast(res?.message);
    },
    onError: (err: GenericResponse) => {
      errorToast(handleErrors(err));
    },
  });
  return {
    mutate,
    isPending,
    isError,
    rest,
  };
};

export const useInitializeBuyerSignup = () => {
  const navigate = useRouter();
  const { mutate, isPending, isError, ...rest } = useMutation({
    mutationFn: async ({ url, data }: any) => {
      return await api.post({ url, body: { data }, auth: false });
    },
    onSuccess: (res, variables) => {
      console.log({ res });
      navigate.push(`#`);
    },
    onError: () => {},
  });
  return {
    mutate,
    isPending,
    isError,
    rest,
  };
};

export const useCompleteBuyerSignup = () => {
  const navigate = useRouter();
  const { mutate, isPending, isError, ...rest } = useMutation({
    mutationFn: async ({ url, data }: any) => {
      return await api.post({ url, body: { data: { ...data } }, auth: false });
    },
    onSuccess: (res) => {
      console.log({ res });
      navigate.push(routes.auth.login.path);
    },
    onError: () => {},
  });
  return {
    mutate,
    isPending,
    isError,
    rest,
  };
};

export const useResetPassword = () => {
  const navigate = useRouter();
  const { mutate, isPending, isError, ...rest } = useMutation({
    mutationFn: async ({ url, data }: any) => {
      return await api.post({ url, body: { ...data }, auth: false });
    },
    onSuccess: (res) => {
      console.log({ res });
      navigate.push('#');
    },
    onError: () => {},
  });
  return {
    mutate,
    isPending,
    isError,
    rest,
  };
};

export const useCreatePassword = () => {
  const navigate = useRouter();
  const { mutate, isPending, isError, ...rest } = useMutation({
    mutationFn: async ({ url, data }: any) => {
      return await api.post({ url, body: { ...data } });
    },
    onSuccess: (res) => {
      console.log({ res });
      navigate.push('#');
    },
    onError: () => {},
  });
  return {
    mutate,
    isPending,
    isError,
    rest,
  };
};

export const useVerifyHash = (urlToRedirect: string) => {
  const navigate = useRouter();
  const { mutate, isPending, isError, ...rest } = useMutation({
    mutationFn: async ({ url, data }: any): Promise<any> => {
      return await api.post({ url, body: { ...data }, auth: false });
    },
    onSuccess: (res: GenericResponse) => {
      const userId = res?.data?.data?.user_id;
      console.log({ res });
      successToast(res?.message);
      navigate.push(`${urlToRedirect}&userid=${userId}`);
    },
    onError: () => {
      navigate.push('/signup?active=signup');
    },
  });
  return {
    mutate,
    isPending,
    isError,
    rest,
  };
};

export const useVerifyHashResetPassword = () => {
  const navigate = useRouter();
  const { mutate, isPending, isError, ...rest } = useMutation({
    mutationFn: async ({ url, data }: any) => {
      return await api.post({ url, body: { ...data }, auth: false });
    },
    onSuccess: () => {
      // console.log({ res });
      navigate.push('/signup?active=signup2');
    },
    onError: () => {},
  });
  return {
    mutate,
    isPending,
    isError,
    rest,
  };
};
