export type UserProps = {
	data: {
		subscriptions: {
			plan: "FREE" | "PRO";
		} | null;
		workspace: {
			id: string;
			name: string;
			type: "PUBLIC" | "PERSONAL";
		}[];
		members: {
			workspace: {
				id: string;
				name: string;
				type: "PUBLIC" | "PERSONAL";
			};
		}[];
	};
};
