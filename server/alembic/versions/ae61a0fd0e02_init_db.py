"""init db

Revision ID: ae61a0fd0e02
Revises: 742f51c7ea2b
Create Date: 2024-08-23 18:13:34.866193

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'ae61a0fd0e02'
down_revision: Union[str, None] = '742f51c7ea2b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
