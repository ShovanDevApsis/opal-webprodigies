import React from "react";

type Props = {
	params: {
		inviteId: string;
	};
};

function page({params: {inviteId}}: Props) {
    const invite = await acceptInvite(inviteId)
	return <div>page</div>;
}

export default page;
