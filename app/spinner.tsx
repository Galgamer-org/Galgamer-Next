'use client';

import { useRouter } from 'next/navigation';

import { useContext, useEffect, useTransition } from "react";
import { ActionQueueContext } from "next/dist/shared/lib/router/action-queue";

const useIsRouterPending = () => {
  const actionQueue = useContext(ActionQueueContext);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!actionQueue) {
      return undefined;
    }
    const originalDispatch = actionQueue.dispatch;
    actionQueue.dispatch = (...args) => {
      startTransition(() => {
        originalDispatch.apply(actionQueue, args);
      });
    };
    return () => {
      actionQueue.dispatch = originalDispatch;
    };
  }, [actionQueue]);

  return isPending;
};


export default function Spinner() {
    const isPending = useIsRouterPending();

    useEffect(() => {
        console.log(`state: ${isPending}`);

    }, [isPending]);

    return(<></>);
}