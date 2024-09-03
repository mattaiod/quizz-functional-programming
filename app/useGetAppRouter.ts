import { useRouter } from "next/navigation";

export default function useGetAppRouter() {
  const router = useRouter();
  return router;
}
