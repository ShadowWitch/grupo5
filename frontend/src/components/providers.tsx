"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { httpStatusMessages } from "@/lib/status-message";
import { useToast } from "@/components/ui/use-toast";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			refetchOnReconnect: false,
			retry: 1,
			// staleTime: 5 * 1000,
			cacheTime: 1000 * 60 * 60 * 24, // 24 hours
			// refetchInterval: 1000 * 60, // 1 minute
		},
	},
});

export default function Providers({ children }: { children: React.ReactNode }) {
	const { toast } = useToast();

	queryClient.setDefaultOptions({
		mutations: {
			onSettled: (data, error, variables, context) => {
				const contextQueries = (context as any)?.queries as any[];
				const contextVariables = (context as any)?.variables;
				const contextMethod = (context as any)?.method;
				const message = (context as any)?.message;
				const response = data as any;
				const responseStatus = response?.status;
				const methodsOtherNames: any = {
					POST: "create",
					PUT: "update",
					DELETE: "delete",
					PATCH: "update",
					GET: "get",
				};
				const method = methodsOtherNames[contextMethod];
				const isStatusError = responseStatus >= 400 && responseStatus <= 500;

				if (responseStatus && contextMethod) {
					const responseMessage = httpStatusMessages(responseStatus, method);
					toast({
						variant: isStatusError ? "destructive" : "default",
						title: responseMessage.title,
						description: message || responseMessage.message,
						duration: 5000,
					});

					if (Array.isArray(contextQueries[0])) {
						contextQueries.forEach((query) => {
							queryClient.invalidateQueries(query);
							queryClient.refetchQueries(query);
						});
					} else {
						queryClient.refetchQueries(contextQueries);
					}
				}
			},
		},
	});

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
