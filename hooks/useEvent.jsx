import useSwr from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

const useEvent = ({ id }) => {
  // const userId = params?.session?.user?.id;
  const { data, isLoading, error } = useSwr(`/api/event/${id}`, fetcher);

  return { event: data, error, isLoading };
};

export default useEvent;
